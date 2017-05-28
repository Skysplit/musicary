<?php

use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic functional test example.
     */
    public function testBasicExample()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
