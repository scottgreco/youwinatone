<?php

/**
 * Managers model config
 */

return array(

    'title' => 'Managers',
    'single' => 'Manager',
    'model' => 'Manager',

    'columns' => array(
        'name' => array(
            'title' => 'Manager Name',
        ),
        'title' => array(
            'title' => 'Title',
        ),
        'license' => array(
            'title' => 'License',
        ),
        'email' => array(
            'title' => 'Email',
        ),
    ),

    'edit_fields' => array(
        'name' => array(
            'title' => 'Manager Name',
            'type' => 'text',
        ),
        'title' => array(
            'title' => 'Title',
            'type' => 'text',
        ),
        'license' => array(
            'title' => 'License',
            'type' => 'text',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'textarea',
            'limit' => 500, //optional, defaults to no limit
            'height' => 130, //optional, defaults to 100
        ),
        'email' => array(
            'title' => 'Email',
            'type' => 'text',
        ),
        'image' => array(
            'title' => 'Image',
            'type' => 'image',
            'location' => public_path() . '/images/managers/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2
        )
    ),
);