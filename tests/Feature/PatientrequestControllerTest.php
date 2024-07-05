<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Patientrequest;

class PatientrequestControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_patient_request()
    {
        $data = [
            'created_on' => now()->format('Y-m-d'),
            'location' => 'Test Location',
            'service' => 'Test Service',
            'status' => 'NEW',
            'priority' => 'HIGH',
            'department' => 'Test Department',
            'requested_by' => 'Test User',
            'assigned_to' => 'Test Assignee',
        ];

        $response = $this->postJson('/api/patientrequests', $data);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'data' => [
                         'id',
                         'created_on',
                         'location',
                         'service',
                         'status',
                         'priority',
                         'department',
                         'requested_by',
                         'assigned_to',
                     ],
                 ]);

        $this->assertDatabaseHas('patientrequests', $data);
    }

    /** @test */
    public function it_can_list_patient_requests()
    {
        Patientrequest::factory()->count(5)->create();

        $response = $this->getJson('/api/patientrequests');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         '*' => [
                             'id',
                             'created_on',
                             'location',
                             'service',
                             'status',
                             'priority',
                             'department',
                             'requested_by',
                             'assigned_to',
                         ],
                     ],
                 ])
                 ->assertJsonCount(5, 'data');
    }

    /** @test */
public function it_can_show_a_patient_request()
{
    $patientRequest = Patientrequest::factory()->create();

    $response = $this->getJson("/api/patientrequests/{$patientRequest->id}");

    $response->assertStatus(200)
             ->assertJson([
                 'data' => [
                     'id' => $patientRequest->id,
                     'created_on' => $patientRequest->created_on,
                     'location' => $patientRequest->location,
                     'service' => $patientRequest->service,
                     'status' => $patientRequest->status,
                     'priority' => $patientRequest->priority,
                     'department' => $patientRequest->department,
                     'requested_by' => $patientRequest->requested_by,
                     'assigned_to' => $patientRequest->assigned_to,
                 ],
             ]);
}

/** @test */
public function it_can_update_a_patient_request()
{
    $patientRequest = Patientrequest::factory()->create();

    $data = [
        'created_on' => now()->format('Y-m-d'),
        'location' => 'Updated Location',
        'service' => 'Updated Service',
        'status' => 'IN_PROGRESS',
        'priority' => 'MEDIUM',
        'department' => 'Updated Department',
        'requested_by' => 'Updated User',
        'assigned_to' => 'Updated Assignee',
    ];

    $response = $this->putJson("/api/patientrequests/{$patientRequest->id}", $data);

    $response->assertStatus(200)
             ->assertJson([
                 'data' => [
                     'id' => $patientRequest->id,
                     'created_on' => $data['created_on'],
                     'location' => $data['location'],
                     'service' => $data['service'],
                     'status' => $data['status'],
                     'priority' => $data['priority'],
                     'department' => $data['department'],
                     'requested_by' => $data['requested_by'],
                     'assigned_to' => $data['assigned_to'],
                 ],
             ]);

    $this->assertDatabaseHas('patientrequests', $data);
}

/** @test */
public function it_can_delete_a_patient_request()
{
    $patientRequest = Patientrequest::factory()->create();

    $response = $this->deleteJson("/api/patientrequests/{$patientRequest->id}");

    $response->assertStatus(200)
             ->assertJson([
                 'message' => 'Item has been deleted successfully',
             ]);

    $this->assertDatabaseMissing('patientrequests', ['id' => $patientRequest->id]);
}

}
