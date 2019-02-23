package za.co.asanda.foodservice.model;

public enum UserProfileType {
    
	MERCHANT("MERCHANT"),
    CUSTOMER("CUSTOMER"),
    DBA("DBA"),
    ADMIN("ADMIN");
     
    String userProfileType;
     
    private UserProfileType(String userProfileType){
        this.userProfileType = userProfileType;
    }
     
    public String getUserProfileType(){
        return userProfileType;
    }
}