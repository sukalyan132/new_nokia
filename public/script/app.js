angular.module("defultApp", [])
.controller('defultController',function ($scope, socket,$timeout) { 
	// Throughput for FDD
    socket.on('throughput', function (data) {

    	$timeout(function () {
								$scope.throughputForFdd		=data.tp[0]+' Mbps';
								$scope.carrier1				=data.fddCarrier[0]+' MHz';
								$scope.carrier1Style	 	={"color":"#68D9E3"};
								$scope.carrier1Up			=true;
							}, 5000);
		
		$timeout(function () {
						        $scope.carrier2		=data.fddCarrier[1]+' MHz';
						        $scope.activateCbrs	=true;
						        $scope.carrier2Style={"color":"#198892"};
						        $scope.carrier2Up	=true;
						    }, 10000);
		$scope.totalThroughput	=data.tp[0]+' Mbps';
    });
    // Activate request for CBRS
    $scope.activateCbrsLink = function() {
									        socket.emit('activateCbrs', {"status": {"sas": true}});
   										};
   	// On activate CBRS response come here
   	socket.on('OnActivateCbrs', function (data) {
   		$scope.activeOnReciveCbrs	=true;
   		$timeout(function () {
								$scope.throughputForCbrs	='300 Mbps';
								$scope.carrier3				=data.freq.cbrs1+' MHz';
								$scope.sas 					= '20 MHz';
								$scope.carrier3Up			=true;
								$scope.carrier4Up			=true;
								$scope.carrier3Style	 	={"color":"#02cc4c"};
								$scope.sty6					={'background-color': '#1fba48','width': '10px','height': '50px'};
								$scope.sty7					={'background-color': '#1fba48','width': '10px','height': '50px'};
							}, 5000);
		$timeout(function () {
						        $scope.carrier4			=data.freq.cbrs2+' MHz';
						        $scope.activateRadar	=true;
						        $scope.totalThroughput	='700 Mbps';
						        $scope.sas 				=data.freq.sas+' MHz';
						        $scope.carrier5Up		=true;
						        $scope.carrier4Style	={"color":"#b5f21a"};
						        $scope.sty8				={'background-color': '#1fba48','width': '10px','height': '50px'};
						        $scope.sty9				={'background-color': '#1fba48','width': '10px','height': '50px'};
						    }, 10000);
		
    });
    // Activate requers for radar link
    $scope.activateRaderLink=function(){
    										$scope.sas 					= '0 MHz';
    										$scope.totalThroughput		= '400 Mbps';
    										$scope.carrier3				='';
    										$scope.carrier4				='';
    										$scope.activateCbrs			=false;
    										$scope.activateRadar		=false;
    										$scope.carrier5Up			=false;
    										$scope.carrier4Up			=false;
    										$scope.sty6					={'background-color': '#ff3b00','width': '10px','height': '50px'};
											$scope.sty7					={'background-color': '#ff3b00','width': '10px','height': '50px'};
											$scope.sty8					={'background-color': '#ff3b00','width': '10px','height': '50px'};
					        				$scope.sty9					={'background-color': '#ff3b00','width': '10px','height': '50px'};
    										socket.emit('activateCbrs',{"status": {"radar": true}});
    									};
    // On activate Radar CBRS response come here
   	socket.on('OnActivateRadarCbrs', function (data) {
   		$timeout(function () {
								$scope.throughputForCbrs	='300 Mbps';
								$scope.carrier3				=data.freq.cbrs1+' MHz';
								$scope.sas 					='20 MHz';
								$scope.carrier6Up			=true;
						        $scope.carrier3Style	 	={"color":"#e2f442"};
						        $scope.sty10				={'background-color': '#1fba48','width': '10px','height': '50px'};
								$scope.sty11				={'background-color': '#1fba48','width': '10px','height': '50px'};
							}, 5000);
		
		$timeout(function () {
						        $scope.carrier4					=data.freq.cbrs2+' MHz';
						        $scope.totalThroughput			='700 Mbps';
						        $scope.sas 						=data.freq.sas+' MHz';
						        $scope.carrier7Up				=true;
						        $scope.carrier4Style			={"color":"#edac21"};
						        $scope.cbrsSecondLinkActivated	=true;
						        $scope.sty12					={'background-color': '#1fba48','width': '10px','height': '50px'};
								$scope.sty13					={'background-color': '#1fba48','width': '10px','height': '50px'};
						    }, 10000);
		
    });
    // Send request for reset 
    $scope.requestForReset=function(){
    									$scope.carrier1					='';
    									$scope.carrier2					='';
    									$scope.carrier3					='';
    									$scope.carrier4					='';
										$scope.carrier1Up				=false;
										$scope.carrier2Up				=false;
										$scope.carrier3Up				=false;
										$scope.carrier4Up				=false;
										$scope.carrier5Up				=false;
										$scope.carrier6Up				=false;
										$scope.carrier7Up				=false;
										$scope.cbrsSecondLinkActivated	=false;
										$scope.activeOnReciveCbrs		=false;
										$scope.sas 						='';
										$scope.throughputForFdd			='';
										$scope.throughputForCbrs		='';
										$scope.totalThroughput			='';
    									socket.emit('resetRequest',{"reset": true});
    								};
       // Send request for mode change 
    $scope.requestForMode=function($status){
    									socket.emit('requestForModeChange',{"offline": $status});
    								};
})
// common factory for socket calback 
.factory('socket', ['$rootScope', function ($rootScope) {
	var socket = io.connect();
	return {
			    on: function (eventName, callback) {
												      function wrapper() {
																	        var args = arguments;
																	        $rootScope.$apply(function ()
																	        {
																	          callback.apply(socket, args);
																	        });
																	      }
														socket.on(eventName, wrapper);
														return function () {
																		    	socket.removeListener(eventName, wrapper);
																		    };
			    									},

			    emit: function (eventName, data, callback) {
														      socket.emit(eventName, data, function () {
																											var args = arguments;
																											$rootScope.$apply(function () 
																											{
																											  if(callback) 
																											  {
																											    callback.apply(socket, args);
																											  }
																											});
														      											});
			    											}
  			};
}])