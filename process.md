```mermaid
graph TD
    A[User] --> B[Open App]
    B --> C[Launch Camera]
    C --> D[Object Recognition with ARCore]
    D --> E[Translate Object Name]
    E --> F[Display Translation in AR Overlay]
    F --> G[User Interacts with Translation]
    G --> H[View More Information optional]

    subgraph Key Technologies
        ARCore[ARCore for Object Recognition]
        VueJS[Vue.js with Quasar for UI]
        TranslationAPI[Google Cloud Translation or ML Kit for Translation]
    end

    ARCore --> D
    VueJS --> F
    TranslationAPI --> E

    subgraph Future Features
        I[Server-side Authentication Python]
    end

    A --> I
