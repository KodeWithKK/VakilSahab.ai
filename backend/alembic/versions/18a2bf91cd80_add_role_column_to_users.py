"""Add role column to users

Revision ID: 18a2bf91cd80
Revises:
Create Date: 2025-05-06 01:35:12.383970

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "18a2bf91cd80"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add the 'role' column to the 'users' table
    op.add_column(
        "users", sa.Column("role", sa.String(), nullable=False, server_default="USER")
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Remove the 'role' column
    op.drop_column("users", "role")
