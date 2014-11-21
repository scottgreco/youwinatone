<?php

/**
 * Users model config
 */

return array(

    'title' => 'States',
    'single' => 'state',
    'model' => 'State',

    'columns' => array(
        'name' => array(
            'title' => 'State Name',
        ),
    ),

    'edit_fields' => array(
        'name' => array(
            'title' => 'State Name',
            'type' => 'text',
        )
    ),
);