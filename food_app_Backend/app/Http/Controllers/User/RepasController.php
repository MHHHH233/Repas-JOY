<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Repas;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RepasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $repas = Repas::with('category')->paginate($perPage);
        return response()->json([
            'success' => true,
            'data' => $repas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'vegan' => 'required|boolean',
            'onView' => 'required|boolean',
            'qte' => 'required|integer|min:0',
            'id_category' => 'required|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $repas = Repas::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Repas created successfully',
            'data' => $repas->load('category')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $repas = Repas::with('category', 'commandes')->find($id);
        
        if (!$repas) {
            return response()->json([
                'success' => false,
                'message' => 'Repas not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $repas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $repas = Repas::find($id);
        
        if (!$repas) {
            return response()->json([
                'success' => false,
                'message' => 'Repas not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'vegan' => 'sometimes|boolean',
            'onView' => 'sometimes|boolean',
            'qte' => 'sometimes|integer|min:0',
            'id_category' => 'sometimes|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $repas->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Repas updated successfully',
            'data' => $repas->load('category')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $repas = Repas::find($id);
        
        if (!$repas) {
            return response()->json([
                'success' => false,
                'message' => 'Repas not found'
            ], 404);
        }

        $repas->delete();

        return response()->json([
            'success' => true,
            'message' => 'Repas deleted successfully'
        ]);
    }

    /**
     * Get repas by category
     */
    public function getByCategory(Request $request, string $categoryId)
    {
        $perPage = (int) $request->query('per_page', 10);
        $repas = Repas::with('category')
            ->where('id_category', $categoryId)
            ->where('onView', true)
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $repas
        ]);
    }
}
