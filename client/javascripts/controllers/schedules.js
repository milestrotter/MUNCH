munch.controller('schedules',function($scope, ScheduleFactory){

	ScheduleFactory.getTips(function(tipdata){
		$scope.tips=tipdata;
	})
	ScheduleFactory.getShift(function(shiftdata){
		$scope.shifts=shiftdata;
	});
	$scope.addTip = function (tipAmount){
		ScheduleFactory.addTip(tipAmount);
	}

	$scope.takeShift=function(item){
		$scope.shifts.splice($scope.shifts.indexOf(item),1);
		ScheduleFactory.takeShift(item, function(data){
	    	
		})
		ScheduleFactory.getSchedule(function(data){
	 	$scope.schedules=data;
			$('#calendar').fullCalendar('removeEvents');
			$('#calendar').fullCalendar('addEventSource', data);         
			$('#calendar').fullCalendar('rerenderEvents' );
			$('#calendar2').fullCalendar('removeEvents');
			$('#calendar2').fullCalendar('addEventSource', data);         
			$('#calendar2').fullCalendar('rerenderEvents' );
		})
	}	
	

	ScheduleFactory.getSchedule(function(data){
	 	$scope.schedules=data;
		date = new Date();  
	    $('#calendar').fullCalendar({
	    header: {
	        left: 'prev,next today',
	        center: 'title',
	        right: 'month,agendaWeek'
	    },
	    defaultDate: date,
	    selectable: true,
	    eventLimit: true, // allow "more" link when too many events
	    // Date format is Year-month-day
	   	eventSources: [data],
	    dayClick: function(date, jsEvent, view){
	        var clicked_date = date.format();
	        $('#calendar2').fullCalendar('gotoDate', clicked_date);
	    }
	})
    $('#calendar2').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: '',  
        },
        defaultDate: date,
        defaultView: 'agendaDay',
        selectable: true,
        selectHelper: true,
        eventLimit: true, // allow "more" link when too many events
        // Date format is Year-month-day
	    eventSources: [data],
        eventClick: function(calEvent, jsEvent, view){
        	scheduleId = calEvent._id;
        	if(confirm("Are you sure you want to release the following shift?\n\n" + calEvent.title + ".\n\n")){
        		ScheduleFactory.removeSchedule(calEvent,function(data){
        			$scope.schedules=data;
        			$('#calendar').fullCalendar('removeEvents');
      				$('#calendar').fullCalendar('addEventSource', data);         
      				$('#calendar').fullCalendar('rerenderEvents' );
      				$('#calendar2').fullCalendar('removeEvents');
      				$('#calendar2').fullCalendar('addEventSource', data);         
      				$('#calendar2').fullCalendar('rerenderEvents' );
        		});
        		// ScheduleFactory.getSchedule(function(output){
        		// });
        	}
        	else{
        		alert('canceled');
        	}
        }
    });

	});
});