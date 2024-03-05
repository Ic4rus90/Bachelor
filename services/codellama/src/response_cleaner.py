import json

def clean_response(llm_output) -> dict:
    # Locate the last occurrence of "Destination: user"
    last_occurance_index = llm_output.rfind("Source: assistant\nDestination: user")

    # Extract everything after "Destination: user"
    if last_occurance_index != -1:
        content_after_last_occurance = llm_output[last_occurance_index:]
        
        # Attempt to find the JSON start
        json_start_index = content_after_last_occurance.find("```json") + len("```json\n")
        json_end_index = content_after_last_occurance.find("```", json_start_index)
        
        if json_start_index != -1 and json_end_index != -1:
            json_text = content_after_last_occurance[json_start_index:json_end_index].strip()
            try:
                # Parse the extracted text to verify it's valid JSON
                json_data = json.loads(json_text)
                return json_data
            except json.JSONDecodeError:
                print("Error decoding JSON")
                raise ValueError("Error decoding JSON")
        else:
            raise ValueError("Could not find JSON in the output.")
    else:     
        raise ValueError("Could not find LLM response in the output.")
            