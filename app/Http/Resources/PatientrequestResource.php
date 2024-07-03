<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientrequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_on' => $this->created_on,
            'location' => $this->location,
            'service' => $this->service,
            'status' => $this->status,
            'priority' => $this->priority,
            'department' => $this->department,
            'requested_by' => $this->requested_by,
            'assigned_to' => $this->assigned_to,
        ];
    }
}
