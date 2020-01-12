class UsersController < ApplicationController
  before_action :authenticate_member!
  def index
    @member = Member.all.with_attached_cover_image
  end

  def show
    start_time = Time.zone.now.beginning_of_day
    end_time = Time.zone.now.end_of_day

    @following = Member.find(params[:id]).following
    @followers = Member.find(params[:id]).followers

    @member = Member.find(params[:id])
    @foods_today = FoodRecord.where(member_id: @member.id).where('created_at BETWEEN ? AND ?', start_time, end_time)
    @calories = []
    @foods_today.each do |f|
      @calories << f['calories']
    end

    @sports = SportRecord.where(member_id: @member.id).where('created_at BETWEEN ? AND ?', start_time, end_time)
    @sprot_calories = []
    @sports.each do |s|
      @sprot_calories << s['totalconsum']
    end
  end
end
