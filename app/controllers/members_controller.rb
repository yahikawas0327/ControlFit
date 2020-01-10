class MembersController < ApplicationController
  before_action :authenticate_member!
  def show
    @following = current_member.following
    @followers = current_member.followers
    @food = FoodRecord.where(member_id: current_member.id)
    @calories = []
    @food.each do |f|
      @calories << f['calories']
    end

    @sport = SportRecord.where(member_id: current_member.id)
    @sprot_calories = []
    @sport.each do |s|
      @sprot_calories << s['totalconsum']
    end

    @membersecret = Membersecret.where(member_id: current_member.id)
    @bmr = []
    @membersecret.each do |m|
      @bmr << m['bmr']
    end
    @a = @bmr.sum - @calories.sum

  end

  def following
    @members = Member.find(params[:id]).following
  end

  def followers
    @members = Member.find(params[:id]).followers
  end


# private
  def foodday
      @food_record_byday = FoodRecord.where(member_id: current_member.id, created_at: Time.now.midnight..Time.now)
      render json:  @food_record_byday
  end

  def foodweek
      @food_record_byweek = FoodRecord.where(member_id: current_member.id, created_at: (7.days.ago.midnight)..Time.now)
      render json:  @food_record_byweek
  end

  def foodmonth
      @food_record_bymonth = FoodRecord.where(member_id: current_member.id, created_at: (1.months.ago.midnight)..Time.now)
      render json:  @food_record_bymonth
  end

  def sportday
      @sport_record_byday = SportRecord.where(member_id: current_member.id, created_at: Time.now.midnight..Time.now)
      render json:  @sport_record_byday
  end

  def sportweek
      @sport_record_byweek = SportRecord.where(member_id: current_member.id, created_at: (7.days.ago.midnight)..Time.now)
      render json:  @sport_record_byweek
  end

  def sportmonth
      @sport_record_bymonth = SportRecord.where(member_id: current_member.id, created_at: (1.months.ago.midnight)..Time.now)
      render json:  @sport_record_bymonth
  end

end

