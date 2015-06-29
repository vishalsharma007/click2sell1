class Ability
  include CanCan::Ability

    def initialize(user)
        user ||=user.new
    if user.is? :admin
        can :manage, :all
    elsif      
       user.is? :author
        can :read, Album
        can :create, Album
        can [:update,:destroy],Album, :user_id =>user.id  
    elsif 
        user.is? :banned
        can :read, Album
        can :create, Album
        can [:update,:destroy],Album, :user_id =>user.id  
    elsif 
        user.is? :moderator
        can :read, Album
        can :create, Album
        can [:update,:destroy],Album, :user_id =>user.id         
                                    
        end
     end
 end
