function Feedback() {
    return (
        <div className="min-h">

           <div className="bg-white-900 w-full align-center rounded-xl shadow-sm">
            <form action="">
                <div>
                    <label htmlFor="feedback" className="p-4 font-bold">Write Your Feedback</label>
                </div>
                <textarea name="feedback" id="feedback" className="border rounded-2xl text-indigo-700" placeholder="Your one feedback very heplful for us......"></textarea>
                <button className="px-4 py-2 bg-indigo-700 text-white rounded-lg">submit</button>
            </form>
           </div>
        </div>
      );
}

export default Feedback;