<?php

/**
 * Managers model config
 */

return array(

    'title' => 'Offices',
    'single' => 'Office',
    'model' => 'Office',

    'columns' => array(
        'name' => array(
            'title' => 'Office Name',
        ),
        'address' => array(
            'title' => 'Address',
        ),
        'city' => array(
            'title' => 'City',
            'relationship' => 'city', //this is the name of the Eloquent relationship method!
            'select' => "(:table).name",
        ),
        'state' => array(
            'title' => 'State',
            'relationship' => 'city.state', //this is the name of the Eloquent relationship method!
            'select' => "(:table).name",
        ),
    ),

    'edit_fields' => array(
        'name' => array(
            'title' => 'Office Name',
            'type' => 'text',
        ),
        'address' => array(
            'title' => 'Title',
            'type' => 'text',
        ),
        'phone' => array(
            'title' => 'License',
            'type' => 'text',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'textarea',
            'limit' => 500, //optional, defaults to no limit
            'height' => 130, //optional, defaults to 100
        ),
        'image' => array(
            'title' => 'Image',
            'type' => 'image',
            'location' => public_path() . '/images/offices/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2
        ),
        'manager' => array(
            'type' => 'relationship',
            'title' => 'Manager',
            'name_field' => 'name', //what column or accessor on the other table you want to use to represent this object
        ),
        'lat' => array(
            'title' => 'Latitude',
            'type' => 'number',
            'decimals' => 12, //optional, defaults to 0
        ),
        'lng' => array(
            'title' => 'Longitude',
            'type' => 'number',
            'decimals' => 12, //optional, defaults to 0
        ),
        'city' => array(
            'type' => 'relationship',
            'title' => 'City',
            'name_field' => 'name', //what column or accessor on the other table you want to use to represent this object
        ),
    ),
);