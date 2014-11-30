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
            'title' => 'Address',
            'type' => 'text',
        ),
        'phone' => array(
            'title' => 'Telephone Number',
            'type' => 'text',
        ),
        'description' => array(
            'title' => 'Description',
            'type' => 'textarea',
            'limit' => 500, //optional, defaults to no limit
            'height' => 130, //optional, defaults to 100
            'width' => 500,
        ),
        'image' => array(
            'title' => 'Image (Max. size 2MB)',
            'type' => 'image',
            'location' => public_path() . '/images/offices/',
            'naming' => 'random',
            'length' => 20,
            'size_limit' => 2
        ),
        'manager' => array(
            'type' => 'relationship',
            'title' => 'Manager',
            'name_field' => 'name',
            'options_sort_field' => 'name',
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
            'name_field' => 'name',
            'options_sort_field' => 'name',
        ),
    ),

    'sort' => array(
        'field' => 'name',
        'direction' => 'asc',
    ),

    'filters' => array(
        'name' => array(
            'title' => 'Office name',
        ),
    ),
);