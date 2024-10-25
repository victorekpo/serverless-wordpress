<?php
// Autoload dependencies
require 'vendor/autoload.php';
require 'wp/wp-load.php'; // Load WordPress core

use Bref\Context\Context;
use Bref\Event\Http\HttpRequestEvent;
use Bref\Event\Http\HttpResponse;
use Bref\Runtime\LambdaRuntime;

LambdaRuntime::fromEnvironmentVariable('LAMBDA_TASK_ROOT')
    ->start(function (HttpRequestEvent $event, Context $context): HttpResponse {
        ob_start(); // Start output buffering

        try {
            // Execute WordPress
            wp(); // This will output to the buffer
            $output = ob_get_clean(); // Get the output from the buffer

            // Print output to stdout
            echo $output;

            return new HttpResponse($output);
        } catch (\Throwable $e) {
            // Log any errors and print to stdout
            error_log($e->getMessage());
            echo "Error executing WordPress: " . $e->getMessage(); // Print error to stdout
            return new HttpResponse('Error executing WordPress', 500);
        }
    });
?>
