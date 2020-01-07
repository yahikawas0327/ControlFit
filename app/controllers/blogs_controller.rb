class BlogsController < ApplicationController
  def index
  end

  def new
      if current_member.present?
        user_name   = current_member.name
        user_gender = current_member.gender
        user_age    = current_member.age
        user_height = current_member.cm
        user_weight = current_member.kg
        user_id     = current_member.id
        user_basic_information = { name: user_name,
                                   gender: user_gender,
                                   age: user_age,
                                   height: user_height,
                                   weight: user_weight,
                                   user_id: user_id,
                                   member_exist:true
                                  }
      respond_to do |format|
        format.json { render json:user_basic_information}
        format.html { render :new }
      end                              
      else
      end
  end

  def create     
     user_secret = Membersecret.find_by(member_id:current_member.id)
     user_height = (params[:Height]).to_i
     user_weight = (params[:Weight]).to_i
     user_gender = params[:Gender]
     user_age    = (params[:Age]).to_i
     user_bmi = bmiformula(user_height, user_weight)
     user_bmi_range = bmirange(user_bmi)
     user_ree = ree_formula(user_weight,user_height,user_gender,user_age)
     user_bmr = (bmr_formula(user_weight,user_height,user_age,user_gender)).round
     physical_hash = { bmi: user_bmi,
                       bmi_range: user_bmi_range,
                       ree: user_ree,
                       bmr: user_bmr}
     if user_secret.present?
        # 若資料存在及更新資料
        user_secret.update(:bmi => user_bmi , 
                            :bmistatus => user_bmi_range,
                            :ree => user_ree,
                            :bmr => user_bmr,
                            :member_id => current_member.id)
     else
        # 若資料不存在則新建資料
        Membersecret.create(:bmi => user_bmi , 
                            :bmistatus => user_bmi_range,
                            :ree => user_ree,
                            :bmr => user_bmr,
                            :member_id => current_member.id)
     end 

     render json: physical_hash
  end

  def update
     # Obtain Post data from physical system
     update_current_member  = Member.find_by(id:current_member.id)
     update_height = (params[:update_height]).to_i
     update_weight = (params[:update_weight]).to_i
     update_age    = (params[:update_age]).to_i
     update_gender = (params[:update_gender])
     # Update member personal  data to Member database
     update_current_member.update( :gender => update_gender,
                                   :cm     => update_height,
                                   :age    => update_age,
                                   :kg     => update_weight)
     puts "finish"
  end

  def tdee
     tdee_current_member = Membersecret.find_by( member_id: current_member.id)
     update_food_intent  = params[:eat]
     update_sport_intent = params[:sport]
     update_tdee         = (params[:tdee]).to_f
     
     tdee_current_member.update( :tdee           => update_tdee,
                                 :foodintention  => update_food_intent,
                                 :sportintention => update_sport_intent)
     puts "tdee finish"   
  end

  def secret
      secret_current_member = Membersecret.find_by( member_id: current_member.id)
      secret_hash = { member_id: secret_current_member.member_id,
                      tdee: secret_current_member.tdee,
                      foodintention: secret_current_member.foodintention,
                      sportintention: secret_current_member.sportintention }
      render json: secret_hash
  end
 
  private
  
  def bmiformula(height, weight)
      height_meter =height/100.0
      bmi = (weight/(height_meter**2)).round
  end
  def bmirange(bmi)
    # bmi_integer=bmi.to_f
    bmi_integer=bmi
    if bmi_integer < 18.5 
      return '體重過輕'
    elsif bmi_integer >= 18.5 && bmi_integer <24
      return '健康體位'
    elsif bmi_integer >= 24 && bmi_integer < 27
      return '過重'
    elsif bmi_integer >= 27 && bmi_integer < 30
      return '輕度肥胖'
    elsif bmi_integer >= 30 && bmi_integer < 35
      return '中度肥胖'
    else
      return '重度肥胖'
    end
  end
  def ree_formula(weight,height,gender,age)
    case gender
    when gender ='男性'
        i=-161
    when gender ='女性'
        i=5
    else
    end 
    ree= (10*weight)+(6.25*height)-(5*age)+i;
  end
  def bmr_formula(weight,height,age,gender)
    case gender
    when gender ='男性'
        bmr = ((13.7*weight)+(5*height)-(6.8*age))+66
    when gender ='女性'
        bmr = ((9.6*weight)+(1.8*height)-(4.7*age))+655
    else
    end
  end
end
