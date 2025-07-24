document.addEventListener('DOMContentLoaded', () => {
    const addCollectionForm = document.getElementById('add-collection-form');
    const collectionsContainer = document.getElementById('collections-container');

    let collections = JSON.parse(localStorage.getItem('collections')) || [];

    const saveCollections = () => {
        localStorage.setItem('collections', JSON.stringify(collections));
    };

    const renderCollections = () => {
        collectionsContainer.innerHTML = '';
        collections.forEach((collection, index) => {
            const collectionEl = document.createElement('div');
            collectionEl.className = 'card mb-4';
            collectionEl.innerHTML = `
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h5 class="card-title mb-1">${collection.title}</h5>
                            <p class="card-text text-muted">${collection.description}</p>
                        </div>
                        <button class="btn btn-icon delete-collection" data-index="${index}"><i class="bi bi-trash"></i></button>
                    </div>
                    <hr class="my-3">
                    <div id="links-container-${index}" class="mb-3">
                        <!-- Links will be dynamically inserted here -->
                    </div>
                    <form class="add-link-form" data-index="${index}">
                        <div class="input-group">
                            <input type="url" class="form-control" placeholder="Paste a link..." required>
                            <input type="text" class="form-control" placeholder="Optional description...">
                            <button class="btn btn-outline-secondary" type="submit"><i class="bi bi-plus-lg"></i> Add</button>
                        </div>
                    </form>
                </div>
            `;
            collectionsContainer.appendChild(collectionEl);
            renderLinks(index);
        });
    };

    const renderLinks = (collectionIndex) => {
        const linksContainer = document.getElementById(`links-container-${collectionIndex}`);
        const collection = collections[collectionIndex];
        linksContainer.innerHTML = '';
        collection.links.forEach((link, linkIndex) => {
            const linkEl = document.createElement('div');
            linkEl.className = 'link-item d-flex justify-content-between align-items-center';
            linkEl.innerHTML = `
                <div>
                    <a href="${link.url}" target="_blank">${link.url}</a>
                    <p class="text-muted mb-0">${link.description}</p>
                </div>
                <button class="btn btn-icon delete-link" data-collection-index="${collectionIndex}" data-link-index="${linkIndex}"><i class="bi bi-x-lg"></i></button>
            `;
            linksContainer.appendChild(linkEl);
        });
    };

    addCollectionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('collection-title');
        const descriptionInput = document.getElementById('collection-description');
        const newCollection = {
            title: titleInput.value,
            description: descriptionInput.value,
            links: []
        };
        collections.push(newCollection);
        saveCollections();
        renderCollections();
        titleInput.value = '';
        descriptionInput.value = '';
    });

    collectionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-collection')) {
            const index = e.target.dataset.index;
            collections.splice(index, 1);
            saveCollections();
            renderCollections();
        }
    });

    collectionsContainer.addEventListener('submit', (e) => {
        if (e.target.classList.contains('add-link-form')) {
            e.preventDefault();
            const collectionIndex = e.target.dataset.index;
            const urlInput = e.target.querySelector('input[type="url"]');
            const descriptionInput = e.target.querySelector('input[type="text"]');
            const newLink = {
                url: urlInput.value,
                description: descriptionInput.value
            };
            collections[collectionIndex].links.push(newLink);
            saveCollections();
            renderLinks(collectionIndex);
            urlInput.value = '';
            descriptionInput.value = '';
        }
    });

    collectionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-link')) {
            const collectionIndex = e.target.dataset.collectionIndex;
            const linkIndex = e.target.dataset.linkIndex;
            collections[collectionIndex].links.splice(linkIndex, 1);
            saveCollections();
            renderLinks(collectionIndex);
        }
    });

    renderCollections();
});