class AddZipcodeToPlaces < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :zipcode, :string
  end
end
