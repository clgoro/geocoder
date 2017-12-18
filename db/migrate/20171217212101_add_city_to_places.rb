class AddCityToPlaces < ActiveRecord::Migration[5.2]
  def change
  	add_column :places, :city, :string
  end
end
