<?php

namespace App\Http\Controllers;

use App\Models\Guide;
use App\Models\GuideStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GuideController extends Controller
{
    public function index()
    {
        $guides = Guide::with('steps')->get();
        return response()->json($guides);
    }

    public function show($id)
    {
        $guide = Guide::with('steps')->findOrFail($id);
        return response()->json($guide);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'icon_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'introduction' => 'required|string',
            'author' => 'required|string',
            'steps' => 'required|string'
        ], [
            'required' => 'Le champ :attribute est requis.',
            'image' => 'Le fichier doit être une image.',
            'mimes' => 'Le format de l\'image doit être: jpeg, png, jpg ou gif.',
            'max' => 'L\'image ne doit pas dépasser 2Mo.'
        ]);

        try {
            DB::beginTransaction();

            // Handle icon image upload
            if ($request->hasFile('icon_image')) {
                $iconPath = $request->file('icon_image')->store('images/guides', 'public');
                $validatedData['icon_image'] = $iconPath;
            }

            // Remove steps from validatedData as we'll handle them separately
            $steps = json_decode($validatedData['steps'], true);
            unset($validatedData['steps']);

            $guide = Guide::create($validatedData);

            // Create steps
            foreach ($steps as $index => $step) {
                $guide->steps()->create([
                    'title' => $step['title'],
                    'content' => $step['content'],
                    'order' => $index + 1
                ]);
            }

            DB::commit();
            return response()->json($guide->load('steps'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'icon_image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'introduction' => 'required|string',
            'author' => 'required|string',
            'steps' => 'required|string'
        ], [
            'required' => 'Le champ :attribute est requis.',
            'image' => 'Le fichier doit être une image.',
            'mimes' => 'Le format de l\'image doit être: jpeg, png, jpg ou gif.',
            'max' => 'L\'image ne doit pas dépasser 2Mo.'
        ]);

        try {
            DB::beginTransaction();

            $guide = Guide::findOrFail($id);

            // Handle icon image upload
            if ($request->hasFile('icon_image')) {
                // Delete old icon if exists
                if ($guide->icon_image) {
                    Storage::disk('public')->delete($guide->icon_image);
                }
                $iconPath = $request->file('icon_image')->store('images/guides', 'public');
                $validatedData['icon_image'] = $iconPath;
            }

            // Remove steps from validatedData as we'll handle them separately
            $steps = json_decode($validatedData['steps'], true);
            unset($validatedData['steps']);

            $guide->update($validatedData);

            // Delete existing steps
            $guide->steps()->delete();

            // Create new steps
            foreach ($steps as $index => $step) {
                $guide->steps()->create([
                    'title' => $step['title'],
                    'content' => $step['content'],
                    'order' => $index + 1
                ]);
            }

            DB::commit();
            return response()->json($guide->load('steps'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $guide = Guide::findOrFail($id);

        // Delete icon image if exists
        if ($guide->icon_image) {
            Storage::disk('public')->delete($guide->icon_image);
        }

        $guide->delete();
        return response()->json(null, 204);
    }
}
