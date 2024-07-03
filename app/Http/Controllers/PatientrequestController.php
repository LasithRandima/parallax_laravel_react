<?php

namespace App\Http\Controllers;

use App\Http\Resources\PatientrequestCollection;
use App\Http\Resources\PatientrequestResource;
use App\Models\Patientrequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PatientrequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests = Patientrequest::orderBy('id', 'desc')->get();
        // return RequestResource::collection($requests);
        return new PatientrequestCollection($requests);
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

        $requestModel = Patientrequest::create($request->all());
        // return response()->json($requestModel, 201);
        return new PatientrequestResource($requestModel);
    }

    /**
     * Display the specified resource.
     */
    public function show(Patientrequest $patientrequest)
    {
        return new PatientrequestResource($patientrequest);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patientrequest $patientrequest)
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

        $patientrequest->update($request->only([
            'created_on','location','service' ,'status' ,'priority' ,'department' ,'requested_by' ,'assigned_to'
        ]));

        // dd($patientrequest);
        return new PatientrequestResource($patientrequest);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patientrequest $patientrequest)
    {
        $patientrequest->delete();
        return response()->json(['message' => 'Item has been deleted successfully'], 200);
    }
}
