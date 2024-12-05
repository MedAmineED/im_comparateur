<?php
namespace App\Http\Controllers;

use App\Models\Actualite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Exception;

class ActualiteController extends Controller
{


    // Retrieve all Actualités
    public function index()
    {
        try {
            $actualites = Actualite::with('utilisateur')->get();
            
            return $actualites;
            
            return response()->json($actualites);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Retrieve a specific Actualité by ID
    public function show($id)
    {
        try {
            $actualite = Actualite::with('utilisateur')->findOrFail($id);
            

            
            return response()->json($actualite);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    // Admin routes - require authentication
    public function store(Request $request)
    {
        // Check authentication first
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        try {
            // Validate request data with more robust rules
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'date_creation' => 'required|date',
                'excerpt' => 'required|string|max:255',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);
    
            // Parse and format date
            $date_creation = \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $request->date_creation)
                ->format('Y-m-d');
    
            // Handle image upload directly to public/storage
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/images/actualities'), $imageName);
                $validatedData['image'] = 'images/actualities/' . $imageName;
            }
    
            // Create Actualite with authenticated user's ID
            $actualiteData = array_merge($validatedData, [
                'date_creation' => $date_creation,
                'user_id' => auth()->id() // Use authenticated user's ID
            ]);
    
            $actualite = Actualite::create($actualiteData);
    
            return response()->json($actualite, 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log validation errors
            Log::warning('Validation failed for Actualite creation', [
                'errors' => $e->errors(),
                'input' => $request->except('image') // Exclude image from log for privacy
            ]);
    
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
    
        } catch (\Exception $e) {
            // Log unexpected errors
            Log::error('Failed to store Actualite', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
    
            return response()->json([
                'error' => 'An unexpected error occurred',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'date_creation' => 'sometimes|required|date',
            'user_id' => 'sometimes|required|exists:users,id',
            'excerpt' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            $actualite = Actualite::findOrFail($id);

            // Handle new image upload
            if ($request->hasFile('image')) {
                if ($actualite->image) {
                    Storage::disk('public')->delete($actualite->image); // Delete old image
                }
                $image = $request->file('image');
                $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/images/actualities'), $imageName);
                $validatedData['image'] = 'images/actualities/' . $imageName;
            }

            // Update Actualite with validated data
            $actualite->update($validatedData);

            return response()->json($actualite);

        } catch (Exception $e) {
            Log::error('Failed to update Actualite: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update Actualite. Please try again.'], 500);
        }
    }

    public function destroy($id)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $actualite = Actualite::findOrFail($id);

            // Delete the associated image if it exists
            if ($actualite->image) {
                Storage::disk('public')->delete($actualite->image);
            }

            $actualite->delete();

            return response()->json(null, 204);

        } catch (Exception $e) {
            Log::error('Failed to delete Actualite: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete Actualite. Please try again.'], 500);
        }
    }
}
