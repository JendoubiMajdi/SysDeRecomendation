import pandas as pd
import numpy as np
import pickle
import os

class ResourceManager:
    resources_loaded = False
    job_posting = None
    students = None

def search_jobs(search_query, embeddings_dataset, k):
    # embedding search query
    embeddings = ResourceManager.embeddings_dataset["embeddings"]
    print('search_query', search_query)
    question = {"job_posting_description": search_query} # similar to the job description from our validation set
    question_embedding = get_embeddings(question).cpu().detach().numpy()
    
    # finding similari embeddings
    similarity_scores = list()
    for e in embeddings:
        similarity = 1 - cosine(question_embedding[0], e)
        similarity_scores.append(similarity)
    similarity_scores = np.array(similarity_scores)
    ranks = np.argsort(similarity_scores)
    ranks = ranks[::-1] # reverse

    return ranks[:k]