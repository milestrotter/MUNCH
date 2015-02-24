munch.controller('schedules',function($scope, ScheduleFactory){
	ScheduleFactory.getStaffList(function(data){
		$scope.staffList = data;
	})
	ScheduleFactory.getLoggedInUserDB(function(data){
		$scope.logged_in_user=data;
	});
	ScheduleFactory.getTips(function(tipdata){
		name = $scope.logged_in_user.username;
		$scope.tips = [];
		for(tips in tipdata){
			if(tipdata[tips].username === name){
				$scope.tips.push(tipdata[tips])
			}
		}
	})
	ScheduleFactory.getPickup(function(newdata){
		$scope.pickup=newdata;
	});
	ScheduleFactory.getShift(function(shiftdata){
		$scope.shifts=shiftdata;
	});
	$scope.addTip = function (tipAmount, username){
		ScheduleFactory.addTip(tipAmount, username);
	}

	$scope.takeShift=function(item){
		$scope.shifts.splice($scope.shifts.indexOf(item),1);
		ScheduleFactory.takeShift(item, function(data){
	    	
		})
		ScheduleFactory.getSchedule(function(data){
	        $scope.schedules = [];
			for(schedule in data){
				if(data[schedule].staff === $scope.logged_in_user.username){
					$scope.schedules.push(data[schedule]);
				}
			}
	 	data = $scope.schedules
			$('#calendar').fullCalendar('removeEvents');
			$('#calendar').fullCalendar('addEventSource', data);         
			$('#calendar').fullCalendar('rerenderEvents' );
			$('#calendar2').fullCalendar('removeEvents');
			$('#calendar2').fullCalendar('addEventSource', data);         
			$('#calendar2').fullCalendar('rerenderEvents' );
		})
	}	
	

	ScheduleFactory.getSchedule(function(data){
		$scope.schedules = [];
		for(schedule in data){
			if(data[schedule].staff === $scope.logged_in_user.username){
				$scope.schedules.push(data[schedule]);
			}
		}
		data = $scope.schedules;
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
        			$scope.schedules = [];
					for(schedule in data){
						if(data[schedule].staff === $scope.logged_in_user.username){
							$scope.schedules.push(data[schedule]);
						}
					}
					data = $scope.schedules;
        			$('#calendar').fullCalendar('removeEvents');
      				$('#calendar').fullCalendar('addEventSource', data);         
      				$('#calendar').fullCalendar('rerenderEvents' );
      				$('#calendar2').fullCalendar('removeEvents');
      				$('#calendar2').fullCalendar('addEventSource', data);         
      				$('#calendar2').fullCalendar('rerenderEvents' );
        		});
        	}
        	else{
        		alert('canceled');
        	}
        }
    });

	});
});