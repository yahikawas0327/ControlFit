class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :remain_bmr, if: :member_signed_in?
  
  def remain_bmr
    start_time = Time.zone.now.beginning_of_day
    end_time = Time.zone.now.end_of_day

    @foods_today = FoodRecord.where(member_id: current_member.id).where('created_at BETWEEN ? AND ?', start_time, end_time)
    @calories = []
    @foods_today.each do |f|
      @calories << f['calories']
    end

    @membersecret = Membersecret.where(member_id: current_member.id)
    @bmr = []
    @membersecret.each do |m|
      @bmr << m['bmr']
    end
    @remain = @bmr.sum - @calories.sum
  end
  
  private
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :gender, :age, :cm, :kg])
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :gender, :age, :cm, :kg])
  end
end
