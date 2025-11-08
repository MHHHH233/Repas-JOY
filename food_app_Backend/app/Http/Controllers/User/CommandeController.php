<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Repas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $commandes = Commande::with(['user', 'repas'])->paginate($perPage);
        return response()->json([
            'success' => true,
            'data' => $commandes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_user' => 'required|exists:users,id',
            'id_repas' => 'required|exists:repas,id',
            'address' => 'required|string|max:255',
            'name' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if repas is available
        $repas = Repas::find($request->id_repas);
        if (!$repas->onView || $repas->qte <= 0) {
            return response()->json([
                'success' => false,
                'message' => 'Repas not available'
            ], 400);
        }

        $commande = Commande::create($request->all());

        // Decrease quantity
        $repas->decrement('qte');

        return response()->json([
            'success' => true,
            'message' => 'Commande created successfully',
            'data' => $commande->load(['user', 'repas'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $commande = Commande::with(['user', 'repas'])->find($id);
        
        if (!$commande) {
            return response()->json([
                'success' => false,
                'message' => 'Commande not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $commande
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $commande = Commande::find($id);
        
        if (!$commande) {
            return response()->json([
                'success' => false,
                'message' => 'Commande not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'id_user' => 'sometimes|exists:users,id',
            'id_repas' => 'sometimes|exists:repas,id',
            'address' => 'sometimes|string|max:255',
            'name' => 'sometimes|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $commande->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Commande updated successfully',
            'data' => $commande->load(['user', 'repas'])
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $commande = Commande::find($id);
        
        if (!$commande) {
            return response()->json([
                'success' => false,
                'message' => 'Commande not found'
            ], 404);
        }

        // Restore quantity
        $repas = Repas::find($commande->id_repas);
        if ($repas) {
            $repas->increment('qte');
        }

        $commande->delete();

        return response()->json([
            'success' => true,
            'message' => 'Commande deleted successfully'
        ]);
    }

    /**
     * Get commandes by user
     */
    public function getByUser(Request $request, string $userId)
    {
        $perPage = (int) $request->query('per_page', 10);
        $commandes = Commande::with(['user', 'repas'])
            ->where('id_user', $userId)
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $commandes
        ]);
    }
}
