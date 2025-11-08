<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SousCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminSousCategoryController extends Controller
{
    /**
     * Display a listing of sous-categories (Admin only)
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $sousCategories = SousCategory::paginate($perPage);
        return response()->json([
            'success' => true,
            'data' => $sousCategories
        ]);
    }

    /**
     * Store a newly created sous-category (Admin only)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'id_category' => 'required|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $sousCategory = SousCategory::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Sous-category created successfully',
            'data' => $sousCategory
        ], 201);
    }

    /**
     * Display the specified sous-category (Admin only)
     */
    public function show(string $id)
    {
        $sousCategory = SousCategory::find($id);

        if (!$sousCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Sous-category not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $sousCategory
        ]);
    }

    /**
     * Update the specified sous-category (Admin only)
     */
    public function update(Request $request, string $id)
    {
        $sousCategory = SousCategory::find($id);

        if (!$sousCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Sous-category not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'id_category' => 'sometimes|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $sousCategory->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Sous-category updated successfully',
            'data' => $sousCategory
        ]);
    }

    /**
     * Remove the specified sous-category (Admin only)
     */
    public function destroy(string $id)
    {
        $sousCategory = SousCategory::find($id);

        if (!$sousCategory) {
            return response()->json([
                'success' => false,
                'message' => 'Sous-category not found'
            ], 404);
        }

        $sousCategory->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sous-category deleted successfully'
        ]);
    }

    /**
     * Get sous-category statistics (Admin only)
     */
    public function getStats()
    {
        $total = SousCategory::count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_sous_categories' => $total
            ]
        ]);
    }
}


