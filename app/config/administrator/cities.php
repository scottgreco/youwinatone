<?php

/**
 * Users model config
 */

return array(

    'title' => 'Cities',
    'single' => 'city',
    'model' => 'City',

    'columns' => array(
        'name' => array(
            'title' => 'City Name',
        ),
        'state' => array(
            'title' => 'State',
            'relationship' => 'state', //this is the name of the Eloquent relationship method!
            'select' => "(:table).name",
        ),
    ),

    'edit_fields' => array(
        'name' => array(
            'title' => 'City Name',
            'type' => 'text',
        ),
        'state' => array(
            'type' => 'relationship',
            'title' => 'State',
            'name_field' => 'name',
            'sort_field' => 'name',
        ),
    ),

    'sort' => array(
        'field' => 'name',
        'direction' => 'asc',
    ),

    'filters' => array(
        'name' => array(
            'title' => 'Cty name',
        ),
    ),
);