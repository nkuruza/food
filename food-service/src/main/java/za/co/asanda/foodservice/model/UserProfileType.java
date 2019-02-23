package za.co.asanda.foodservice.model;

public enum UserProfileType {
    
    DBA("DBA"),
    ADMIN("ADMIN"),
    USER("USER"),
    VIP("VIP"),
    MECHANIC("MECHANIC"),
	SUPPLIER("SUPPLIER");
     
    String userProfileType;
     
    private UserProfileType(String userProfileType){
        this.userProfileType = userProfileType;
    }
     
    public String getUserProfileType(){
        return userProfileType;
    }
}