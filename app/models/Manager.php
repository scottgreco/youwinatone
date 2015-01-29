<?php

class Manager extends EloquentBaseModel {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'managers';

    protected $forcedNullFields = ['email'];

    protected $hidden = array('created_at', 'updated_at');

    public function office()
    {
        return $this->hasOne('Office');
    }

    public static $rules = array(
        'name' => 'required',
        'title' => 'required',
        'email' => 'email|unique:managers',
    );

    public function isValid()
    {
        return Validator::make(
            $this->toArray(),
            Manager::$rules
        )->passes();
    }
}

Manager::created(function($manager)
{
    $s3 = App::make('aws')->get('s3');
    $s3->putObject(array(
        'Bucket'     => 'ywao-storage',
        'Key'        => 'managers/'.$manager->image,
        'SourceFile' => public_path() . '/images/managers/' . $manager->image,
    ));

    var_dump($manager->image);
    unlink(public_path() . '/images/managers/' . $manager->image);
});

Manager::updated(function($manager)
{
    $s3 = App::make('aws')->get('s3');

    $exists = $s3->doesObjectExist('ywao-storage', 'managers/'.$manager->image);

    if($exists === false) {
        $s3->putObject(array(
            'Bucket'     => 'ywao-storage',
            'Key'        => 'managers/'.$manager->image,
            'SourceFile' => public_path() . '/images/managers/' . $manager->image,
        ));

        unlink(public_path() . '/images/managers/' . $manager->image);
    }

});

Manager::deleted(function($manager)
{
    $s3 = App::make('aws')->get('s3');
    $exists = $s3->doesObjectExist('ywao-storage', 'managers/'.$manager->image);

    if($exists === true) {
        $s3->deleteObject(array(
            'Bucket' => 'ywao-storage',
            'Key' => 'managers/' . $manager->image
        ));
    }



});