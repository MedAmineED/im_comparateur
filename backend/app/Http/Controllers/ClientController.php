<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    /**
     * Display a listing of clients.
     */
    public function index()
    {
        try {
            return response()->json(Client::all());
        } catch (\Exception $e) {
            Log::error('Error fetching clients: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch clients'], 500);
        }
    }

    /**
     * Store a new client in the database (public endpoint).
     */
    public function storePublic(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'firstname' => 'required|string|max:255',
                'lastname'  => 'required|string|max:255',
                'age'       => 'required|integer|min:0',
                'tel'       => 'required|string|max:15',
                'address'   => 'required|string|max:255',
                'email'     => 'required|email|unique:clients,email',
            ]);

            $client = Client::create($validatedData);
            return response()->json($client, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error creating client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create client'], 500);
        }
    }

    /**
     * Store a new client in the database (admin endpoint).
     */
    public function store(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $validatedData = $request->validate([
                'firstname' => 'required|string|max:255',
                'lastname'  => 'required|string|max:255',
                'age'       => 'required|integer|min:0',
                'tel'       => 'required|string|max:15',
                'address'   => 'required|string|max:255',
                'email'     => 'required|email|unique:clients,email',
            ]);

            $client = Client::create($validatedData);
            return response()->json($client, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error creating client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create client'], 500);
        }
    }

    /**
     * Display the specified client.
     */
    public function show($id)
    {
        try {
            $client = Client::findOrFail($id);
            return response()->json($client);
        } catch (\Exception $e) {
            Log::error('Error fetching client: ' . $e->getMessage());
            return response()->json(['error' => 'Client not found'], 404);
        }
    }

    /**
     * Update the specified client in the database.
     */
    public function update(Request $request, $id)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $client = Client::findOrFail($id);
            $validatedData = $request->validate([
                'firstname' => 'sometimes|required|string|max:255',
                'lastname'  => 'sometimes|required|string|max:255',
                'age'       => 'sometimes|required|integer|min:0',
                'tel'       => 'sometimes|required|string|max:15',
                'address'   => 'sometimes|required|string|max:255',
                'email'     => 'sometimes|required|email|unique:clients,email,' . $id,
            ]);

            $client->update($validatedData);
            return response()->json($client);
        } catch (\Exception $e) {
            Log::error('Error updating client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update client'], 500);
        }
    }

    /**
     * Remove the specified client from storage.
     */
    public function destroy($id)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        try {
            $client = Client::findOrFail($id);
            $client->delete();
            return response()->json(['message' => 'Client deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Error deleting client: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete client'], 500);
        }
    }
}
