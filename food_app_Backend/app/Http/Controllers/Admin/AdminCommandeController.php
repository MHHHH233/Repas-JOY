<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminCommandeController extends Controller
{
    /**
     * Display a listing of all commandes (Admin only)
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
     * Store a newly created commande (Admin only)
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

        $commande = Commande::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Commande created successfully',
            'data' => $commande->load(['user', 'repas'])
        ], 201);
    }

    /**
     * Display the specified commande (Admin only)
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
     * Update the specified commande (Admin only)
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
     * Remove the specified commande (Admin only)
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

        $commande->delete();

        return response()->json([
            'success' => true,
            'message' => 'Commande deleted successfully'
        ]);
    }

    /**
     * Get commande statistics (Admin only)
     */
    public function getStats()
    {
        $totalCommandes = Commande::count();
        $commandesToday = Commande::whereDate('created_at', today())->count();
        $commandesThisWeek = Commande::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count();
        $commandesThisMonth = Commande::whereMonth('created_at', now()->month)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_commandes' => $totalCommandes,
                'commandes_today' => $commandesToday,
                'commandes_this_week' => $commandesThisWeek,
                'commandes_this_month' => $commandesThisMonth
            ]
        ]);
    }
}
