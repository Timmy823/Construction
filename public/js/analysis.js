// Only one can be checked.
$('input[name="Statistics"]').click(function(){
    if($(this).is(':checked')){
        $('input[name="Statistics"]').prop('checked',false);
        $(this).prop('checked',true);
        // when the relation option is selected
        if($(this).val() == 3){
            $("select[name='Start-Year']").prop('disabled',false);
            $("select[name='End-Year']").prop('disabled',false);
            $("select[name='construction']").prop('disabled',false);
            $("select[name='factor']").prop('disabled',false);
        }
        else{
            $("select[name='Start-Year']").prop('disabled',true);
            $("select[name='End-Year']").prop('disabled',true);
            $("select[name='construction']").prop('disabled',true);
            $("select[name='factor']").prop('disabled',true);
        }
    }
    
});
$('input[name="DynamicMap"]').click(function(){
    if($(this).is(':checked')){
        $('input[name="DynamicMap"]').prop('checked',false);
        $(this).prop('checked',true);
        $(this).prop('disabled',true);
        console.log($(this).val());
        if($(this).val() == 1)
            $("iframe").attr("src","https://plot.ly/~allen120932/10.embed");
        if($(this).val() == 2)
            $("iframe").attr("src","https://plot.ly/~allen120932/17.embed");
    }
});
// the analysis graph logic function
$('button[submit = "submit"]').click(function(){
    $('input').prop('disabled',false);
    $('input:checked').prop('disabled',true);

    var value = $('input:checked').val();
    if(value == 1)
        $("img").attr("src" ,"img/Statistics(common).png");
    else if(value == 2)
        $("img").attr("src" ,"img/Statistics(emergency).png");
    else if(value == 3){
        var Xlabel = $("select[name='construction']").val();
        var Ylabel = $("select[name='factor']").val();
        var StartYear = $("select[name='Start-Year']").val();
        var EndYear = $("select[name='End-Year']").val();
        console.log("img/"+Xlabel+"_"+Ylabel+"("+StartYear+"_"+EndYear+").png");
        if(StartYear == EndYear)
            $("img").attr("src" ,"img/"+Xlabel+"_"+Ylabel+"("+StartYear+").png");
        else
            $("img").attr("src" ,"img/"+Xlabel+"_"+Ylabel+"("+StartYear+"_"+EndYear+").png");
    }
});
// The logic for the selection of start&end year
function LimitChoice(){
    var number = $("select[name='Start-Year']").val();
    // hide the option of end-year before start-year
    $("select[name='End-Year'] option").each(function(i,item){
        if($(item).val() < number){
            $(item).hide();
            $(item).prop('selected', false);
        }
        else if($(item).val() == number){
            $(item).show();
            $(item).prop('selected', true);
        }
        else
            $(item).show();
    });
}
