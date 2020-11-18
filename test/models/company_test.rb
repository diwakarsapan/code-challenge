require "test_helper"

class CompanyTest < ActiveSupport::TestCase
  setup do
    @company = companies(:hometown_painting)
  end

  test "should save without changing email" do
    assert @company.save
  end

  test "should not save when changing email and not @getmainstreet.com domain" do
    refute @company.update(email: "john.doe@example.com")
    assert_equal ["should be @getmainstreet.com"], @company.errors[:email]
  end

  test "should save without email" do
    assert @company.update(email: nil)
  end

  test "should create a new company without email" do
    assert_difference("Company.count") do
      assert @company.dup.update(email: nil)
    end
  end

  test "should not create a new company without @getmainstreet.com email" do
    assert_no_difference("Company.count") do
      refute @company.dup.update(email: "company@example.com")
    end
  end

  test "should create a new company with @getmainstreet.com email" do
    assert_difference("Company.count") do
      assert @company.dup.update(email: "company@getmainstreet.com")
    end
  end

  test "should not save without brand color" do
    refute @company.update(:brand_color => nil)
  end
end
