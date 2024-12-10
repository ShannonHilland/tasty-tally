export default function AboutDetails() {
    return(
        <>
        <div className="m-5 md:mx-48">
        <h1 className="mb-2 text-primary font-semibold text-xl md:text-2xl">Welcome to Tasty Tally!</h1>
        <p className="mb-2">Tasty Tally is a free food tracking app that focuses on making healthy choices instead of tracking calories or eliminating foods from your diet.</p>
        <h2 className="mb-2 text-primary text-lg md:text-xl">How does it work?</h2>
        <p className="mb-2">When you sign in initially, your profile will request information about you, such as height, weight, gender and activity level. It will then calculate
           a customized daily point goal for you! Next you can head to the Dashboard to log the food you eat and see your tally throughout the day.
        </p>
        <h2 className="mb-2 text-primary text-lg md:text-xl">How are points calculated for food? (And why are some Zero Points?)</h2>
        <p className="mb-2">Remember when we said we are focusing on healthy choices rather than calories? Think about free foods as really healthy food. They&apos;re good for us, and we don&apos;t tend to overeat them. A rule of thumb is that free foods are:</p>
        <ul className="ml-8 list-disc mb-2">
          <li>Vegetables!! (exceptions are starchy veggies like potatoes and corn)</li>
          <li>Fruit (Fresh or frozen are free, but dried or juiced you will need to track)</li>
          <li>Seafood</li>
          <li>White meat (like chicken and turkey breast)</li>
          <li>Eggs</li>
          <li>Beans, legumes and pulses</li>
          <li>0% Plain Greek Yogurt</li>
        </ul>
        <p className="mb-2">For food not on this list, we take into account a food&apos;s calories, saturated fat, sugar and protein. Calories create the base of food&apos;s point value: saturated fat and sugar increase the point value, while protein will bring it down.
           This can provide you a quick snapshot at a food&apos;s &quot;health&quot; level. For instance, if you see that a cup of rice and a cookie both have a value of 6 points you might have to decide if you want rice with your dinner... or if you want to have a cookie for dessert. To stay within your points maybe you decide to have a salad with dinner instead of rice, so you can have a cookie as dessert and still stay within your daily goal. Or maybe you decide that 1 cup of rice is way better than a cookie, so you have rice with dinner and an apple for dessert. </p>
        <p className="mb-2">You can&apos;t spend your points incorrectly, you just have to be mindful of what you&apos;re eating, and stick to your goal.</p>
        <h2 className="mb-2 text-primary text-lg md:text-xl">What is the food list?</h2>
        <p className="mb-2">The food list is our community list of all the foods you can track. Everyone with an account can add food to the list, just press &quot;Add a New Food Item&quot; if you search for a food that doesn&apos;t exist, fill out the form (and if it belongs to one of the categories above, select that it&apos;s a free food item) and once you add it, it will be available to all users in the community!
          Right now the list is small, but as more people use the app, the list will grow and you&apos;ll have more options to choose from.
        </p>
        <p className="mb-2">Just remember, being aware of the food we eat and trying to shift to eating better is a lifestyle change. If you go over your points budget don&apos;t be too hard on yourself. Look at what you ate, look at if it was a special occassion or a holiday, and think about what changes you can make tomorrow to bring that tally down a little. It&apos;s all part of the journey!
        </p>
      </div>
      </>
    )
}