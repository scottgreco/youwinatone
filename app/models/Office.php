<?php

class Office extends Eloquent {

    /**
    * The database table used by the model.
    *
    * @var string
    */
    protected $table = 'offices';

    protected $hidden = array('manager_id', 'city_id', 'created_at', 'updated_at');

    /**
     * Defines a one-to-one relationship.
     *
     * @see http://laravel.com/docs/eloquent#one-to-one
     */
    public function manager()
    {
       return $this->belongsTo('Manager');
    }

    public function city()
    {
        return $this->belongsTo('City');
    }

}