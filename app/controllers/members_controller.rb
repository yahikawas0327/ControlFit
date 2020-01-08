class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    @members = current_member
  end

  def following
    @members = Member.find(params[:id]).following
  end

  def followers
    @members = Member.find(params[:id]).followers
  end



  def day
      @food_record_byday = FoodRecord.where(created_at: Time.now.midnight..Time.now)
      render json:  @food_record_byday
  end

  def week
      @food_record_byweek = FoodRecord.where(created_at: (7.days.ago.midnight)..Time.now)
      render json:  @food_record_byweek
  end

  def month
      @food_record_bymonth = FoodRecord.where(created_at: (1.months.ago.midnight)..Time.now)
      render json:  @food_record_bymonth
  end
end

