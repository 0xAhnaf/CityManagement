import { useState } from "react"

export default function Form(){
    function handleSubmit(e){
      e.preventDefault();
      const formData = new FormData(e.target);

      const existing = JSON.parse(localStorage.getItem("complaints")) || [];
      const newComplaint = {
        "title" : formData.get("title"),
        "Category" : formData.get("category"),
        "description" : formData.get("description"),
        "location" : formData.get("location")
      }

      const updated = [newComplaint, ...existing]
      localStorage.setItem("complaints",
        JSON.stringify(updated)
      )

      e.target.reset()
    };

  return (
    <>
      <main className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="Title">Title</label>
              <input name="title"></input>
            </div>

            <div className="form-group">
              <label htmlFor="Category">Category</label>
              <select name="category">
                <option value="Sanitation">Sanitation</option>
                <option value="Road">Road</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Graffiti">Graffiti</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Description">Description</label>
              <textarea name="description" rows={5}></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="Location">Location</label>
              <input name="location"></input>
            </div>
            <button type="submit">Submit</button>
          </form>
        </main>
    </>
  )
}