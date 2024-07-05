<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patientrequest>
 */
class PatientrequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $floor = 'F' . $this->faker->numberBetween(1, 9);
        $room = $this->faker->numberBetween(100, 130);
        $block = 'Ward-' . chr($this->faker->numberBetween(65, 90)); // 'A' to 'Z'


        return [
            'created_on' => $this->faker->date(),
            'location' => $floor . $room . $block,
            'service' => $this->faker->word(),
            'status' => $this->faker->randomElement(['NEW', 'IN_PROGRESS', 'ON_HOLD', 'REJECTED', 'CANCELLED']),
            'priority' => $this->faker->randomElement(['HIGH', 'MEDIUM', 'LOW']),
            'department' => $this->faker->word(),
            'requested_by' => $this->faker->name(),
            'assigned_to' => $this->faker->name(),
        ];
    }
}
