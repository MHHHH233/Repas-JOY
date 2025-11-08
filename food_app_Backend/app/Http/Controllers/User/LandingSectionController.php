<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\LandingSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LandingSectionController extends Controller
{
    /**
     * Display a listing of landing sections.
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $sections = LandingSection::paginate($perPage);
        return response()->json([
            'success' => true,
            'data' => $sections
        ]);
    }

    /**
     * Store a newly created landing section.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'background_img' => 'required|string|max:1024',
            'title_text' => 'required|string|max:255',
            'subtitle_text' => 'nullable|string|max:500',
            'button_text' => 'nullable|string|max:100',
            'button_link' => 'nullable|url|max:255',
            'is_active' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $section = LandingSection::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Landing section created successfully',
            'data' => $section
        ], 201);
    }

    /**
     * Display the specified landing section.
     */
    public function show(string $id)
    {
        $section = LandingSection::find($id);

        if (!$section) {
            return response()->json([
                'success' => false,
                'message' => 'Landing section not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $section
        ]);
    }

    /**
     * Update the specified landing section.
     */
    public function update(Request $request, string $id)
    {
        $section = LandingSection::find($id);

        if (!$section) {
            return response()->json([
                'success' => false,
                'message' => 'Landing section not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'background_img' => 'sometimes|string|max:1024',
            'title_text' => 'sometimes|string|max:255',
            'subtitle_text' => 'sometimes|nullable|string|max:500',
            'button_text' => 'sometimes|nullable|string|max:100',
            'button_link' => 'sometimes|nullable|url|max:255',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        $section->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Landing section updated successfully',
            'data' => $section
        ]);
    }

    /**
     * Remove the specified landing section.
     */
    public function destroy(string $id)
    {
        $section = LandingSection::find($id);

        if (!$section) {
            return response()->json([
                'success' => false,
                'message' => 'Landing section not found'
            ], 404);
        }

        $section->delete();

        return response()->json([
            'success' => true,
            'message' => 'Landing section deleted successfully'
        ]);
    }

    /**
     * Get only active landing sections.
     */
    public function active(Request $request)
    {
        $perPage = (int) $request->query('per_page', 10);
        $sections = LandingSection::where('is_active', true)->paginate($perPage);
        return response()->json([
            'success' => true,
            'data' => $sections
        ]);
    }
}


