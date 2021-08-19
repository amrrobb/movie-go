export default function Box({text, text2}) {
    return (
        <div className="container w-25 my-4 p-5 bg-grad-black rad-card form-box"  >
            <div className="mt-4 text-center">
                <h4>{text}</h4>
                <h6>{text2}</h6>
            </div>
        </div>
    )
}