<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;
use App\Http\Resources\RequestResource;
use App\Models\Request as Requests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return response()->json(Requests::all());

        $requests = Requests::orderBy('id', 'desc')->get();
        // return RequestResource::collection($requests);
        return new RequestCollection($requests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'created_on' => 'required|date',
            'location' => 'required|string',
            'service' => 'required|string',
            'status' => 'required|in:NEW,IN_PROGRESS,ON_HOLD,REJECTED,CANCELLED',
            'priority' => 'required|in:HIGH,MEDIUM,LOW',
            'department' => 'required|string',
            'requested_by' => 'required|string',
            'assigned_to' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $requestModel = Requests::create($request->all());
        return response()->json($requestModel, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Requests $request)
    {
        return new RequestResource($request);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Requests $requestModel)
    {
        $validator = Validator::make($request->all(), [
            'created_on' => 'required|date',
            'location' => 'required|string',
            'service' => 'required|string',
            'status' => 'required|in:NEW,IN_PROGRESS,ON_HOLD,REJECTED,CANCELLED',
            'priority' => 'required|in:HIGH,MEDIUM,LOW',
            'department' => 'required|string',
            'requested_by' => 'required|string',
            'assigned_to' => 'required|string',
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $requestModel->update($request->only([
            'created_on','location','service' ,'status' ,'priority' ,'department' ,'requested_by' ,'assigned_to'
        ]));

        dd($requestModel);
        return new RequestResource($requestModel);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requests $request)
    {
        $request->delete();
        return response()->json(['message' => 'Item has been deleted successfully'], 200);
    }
}
