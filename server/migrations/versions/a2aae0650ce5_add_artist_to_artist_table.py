"""add artist_to_artist table

Revision ID: a2aae0650ce5
Revises: 9baaebdacbd7
Create Date: 2023-12-07 09:56:56.256838

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a2aae0650ce5'
down_revision = '9baaebdacbd7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('artist_to_artist',
    sa.Column('followed_artist_id', sa.Integer(), nullable=False),
    sa.Column('following_artist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['followed_artist_id'], ['artists.id'], ),
    sa.ForeignKeyConstraint(['following_artist_id'], ['artists.id'], ),
    sa.PrimaryKeyConstraint('followed_artist_id', 'following_artist_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('artist_to_artist')
    # ### end Alembic commands ###