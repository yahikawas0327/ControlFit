class UsersController < ApplicationController
  before_action :authenticate_member!
  def index
    @member = Member.all.with_attached_cover_image
  end

  def show
    @following = Member.find(params[:id]).following
    @followers = Member.find(params[:id]).followers

    @member = Member.find(params[:id])
    start_time = Time.zone.now.beginning_of_day
    end_time = Time.zone.now.end_of_day
    @foods = FoodRecord.where(member_id: @member.id)
    # .where('created_at BETWEEN ? AND ?', start_time, end_time)
    @calories = []
    @foods.each do |f|
      @calories << f['calories']
    end

    @sport = SportRecord.where(member_id: @member.id)
    @sprot_calories = []
    @sport.each do |s|
      @sprot_calories << s['totalconsum']
    end
  end

  def new
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
