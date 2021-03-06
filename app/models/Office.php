<?php

class Office extends Eloquent {

    /**
    * The database table used by the model.
    *
    * @var string
    */
    protected $table = 'offices';

    protected $hidden = array('manager_id', 'created_at', 'updated_at');

    public static $rules = array(
        'name' => 'required',
        'address' => 'required',
        'lat' => 'required',
        'lng' => 'required',
        'city_id' => 'required',
        'manager_id' => 'required',
    );

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

Office::created(function($office)
{
    $s3 = App::make('aws')->get('s3');
    $s3->putObject(array(
        'Bucket'     => 'ywao-storage',
        'Key'        => 'offices/'.$office->image,
        'SourceFile' => public_path() . '/images/offices/' . $office->image,
    ));

    unlink(public_path() . '/images/offices/' . $office->image);
});

Office::updated(function($office)
{
    $s3 = App::make('aws')->get('s3');

    $exists = $s3->doesObjectExist('ywao-storage', 'offices/'.$office->image);

    if($exists === false) {
        $s3->putObject(array(
            'Bucket'     => 'ywao-storage',
            'Key'        => 'offices/'.$office->image,
            'SourceFile' => public_path() . '/images/offices/' . $office->image,
        ));

        unlink(public_path() . '/images/offices/' . $office->image);
    }

});

Office::deleted(function($office)
{
    $s3 = App::make('aws')->get('s3');
    $exists = $s3->doesObjectExist('ywao-storage', 'offices/'.$office->image);

    if($exists === true) {
        $s3->deleteObject(array(
            'Bucket' => 'ywao-storage',
            'Key' => 'offices/' . $office->image
        ));
    }



});