class Members::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @member = Member.from_omniauth(request.env["omniauth.auth"])

    if @member.persisted?
      sign_in_and_redirect @member, event: :authentication
      set_flash_message(:notice, :success, kind: "Google") if is_navigational_format?
    else
      session["devise.google_data"] = request.env["omniauth.auth"]
      redirect_to new_member_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end