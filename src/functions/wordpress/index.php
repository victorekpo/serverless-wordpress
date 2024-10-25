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
        ob_start();
        try {
            // Execute WordPress
            wp();
            $output = ob_get_clean();
            return new HttpResponse($output);
        } catch (\Throwable $e) {
            // Log any errors
            error_log($e->getMessage());
            return new HttpResponse('Error executing WordPress', 500);
        }
    });

?>
