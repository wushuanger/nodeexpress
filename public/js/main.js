$(document).ready(function(){
    $('.delete-solution').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url:'/solutions/'+id,
            success:function(response){
                alert('Deleting Solution');
                window.location.href='/';
            },
            error:function(err){
                console.log(err);


            }

        });

    });

});