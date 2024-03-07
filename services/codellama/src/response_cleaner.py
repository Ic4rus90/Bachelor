import json

def clean_response(llm_output) -> str:  # Change the return type hint to str
    # Locate the last occurrence of "Destination: user"
    last_occurrence_index = llm_output.rfind("### Assistant\n")

    # Extract everything after "Destination: user"
    if last_occurrence_index != -1:
        content_after_last_occurrence = llm_output[last_occurrence_index:]
        
        # Attempt to find the JSON start
        json_start_index = content_after_last_occurrence.find("```json") + len("```json\n")
        json_end_index = content_after_last_occurrence.find("```", json_start_index)
        
        if json_start_index != -1 and json_end_index != -1:
            json_text = content_after_last_occurrence[json_start_index:json_end_index].strip()
            return json_text
        else:
            raise ValueError("Could not find JSON in the output.")
    else:     
        raise ValueError("Could not find LLM response in the output.")
