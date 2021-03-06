class ApplicationController < ActionController::Base
 before_filter :configure_permitted_parameters, if: :devise_controller?


  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 protect_from_forgery with: :exception
  before_action :authenticate_user!

  rescue_from CanCan::AccessDenied do |exception|
  	redirect_to root_path :alert=>exception.message

end

 def after_sign_in_path_for(resource)
    new_user_path
 end
 def after_sign_out_path_for(resource)
   new_user_session_path
 end


 protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:firstname,:lastname,:email, :password, :password_confirmation, {roles: []})}
  end
end

  

