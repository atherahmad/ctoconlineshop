import React from 'react';
import { Link } from 'react-router-dom'
const LastSeenDescription = () => {
    return (
        <div className="lastSeenBox">

            <div className="describ">
                <h3>What can you do here?</h3>
                <p>Online shopping is the activity or action of buying products or services over the Internet. It means going online, landing on a seller’s website, selecting something, and arranging for its delivery. The buyer either pays for the good or service online with a credit or debit card or upon delivery.

                In this article, the term ‘online’ means ‘on the Internet.’

                The term does not only include buying things online but also searching for them online. In other words, I may have been engaged in online shopping but did not buy anything.

                Online shopping has been around for about twenty-five years. It has grown in popularity significantly.
            </p>
                <div className="extra">
                    <p>So, if zou wanna have more opportunity and can be connect with others and have private Profile, SIGN UP !
            </p>
                    <Link to="/signup">
                        <button className="btn"> Go For Sign Up !!!</button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default LastSeenDescription;